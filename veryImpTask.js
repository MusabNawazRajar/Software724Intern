const veryIntensiveTask = async taskDataArguments => {
  let isTempAlert = false,
    isGassDetectedAlert = false,
    isWetnessDetectedAlert = false,
    isHumidityDetectedAlert = false,
    isBabyCriesDetectedAlert = false;
  isBabyTemperatureAlert = false;

  const {delay} = taskDataArguments;
  try {
    let i = 0;
    while (BackgroundService.isRunning()) {
      const [tempLimit, sencondLatestTempLimit] = await getLatestValue(
        'Temperature',
        'value',
      );
      if (
        tempLimit >= 40 &&
        tempLimit !== sencondLatestTempLimit &&
        isTempAlert == false
      ) {
        await sendNotification(tempLimit, 'Temperature', 40); // Potential typo here
        isTempAlert = true;
        setTimeout(() => {
          isTempAlert = false;
        }, 60000); // Reset after 1 minute (60000 milliseconds)
      }

      const [gasDetectionStatus, secondLatestGasDetectionStatus] =
        await getLatestBoolValue('GasDetection', 'GassDetected');

      console.log(
        'checking value of the ' +
          gasDetectionStatus +
          ' and ' +
          secondLatestGasDetectionStatus,
      );

      if (
        gasDetectionStatus == true &&
        gasDetectionStatus !== secondLatestGasDetectionStatus &&
        !isGassDetectedAlert
      ) {
        sendNotificationBool('Gas'); // Potential typo here
        isGassDetectedAlert = true;
        setTimeout(() => {
          isGassDetectedAlert = false;
        }, 60000); // Reset after 1 minute
      }

      const [wetnessDetectionStatus, secondLatestWetnessDetectionStatus] =
        await getLatestBoolValue('Wetness', 'WetDetected');

      if (
        wetnessDetectionStatus == true &&
        wetnessDetectionStatus !== secondLatestWetnessDetectionStatus &&
        !isWetnessDetectedAlert
      ) {
        sendNotificationBool('Wetness'); // Potential typo here
        isWetnessDetectedAlert = true;
        setTimeout(() => {
          isWetnessDetectedAlert = false;
        }, 60000); // Reset after 1 minute
      }

      const [humidityValue, secondLatestHumidityValue] = await getLatestValue(
        'Humidity',
        'value',
      );

      if (
        humidityValue > 70 &&
        humidityValue > secondLatestHumidityValue &&
        !isHumidityDetectedAlert
      ) {
        await sendNotification(humidityValue, 'Humidity', 70); // Potential typo here
        isHumidityDetectedAlert = true;

        setTimeout(() => {
          isHumidityDetectedAlert = false;
        }, 60000); // Reset after 1 minute
      }

      const [babyTemperatureValue, secondLatestBabyTemperatureValue] =
        await getLatestValue('BabyTemperature', 'value');
      if (
        babyTemperatureValue > 38 &&
        babyTemperatureValue > secondLatestBabyTemperatureValue &&
        isBabyTemperatureAlert === false
      ) {
        await sendNotification(babyTemperatureValue, 'Body Temperature', 38); // Potential typo here
        isBabyTemperatureAlert = true;
        setTimeout(() => {
          isBabyTemperatureAlert = false;
        }, 60000); // Reset after 1 minute
      }

      const [babyCriesStatus, secondLatestBabyCriesStatus] =
        await getLatestBoolValue('BabyCries', 'Status');

      if (
        babyCriesStatus === true &&
        babyCriesStatus !== secondLatestBabyCriesStatus &&
        isBabyCriesDetectedAlert === false
      ) {
        sendNotificationBool('Baby Crying');
        isBabyCriesDetectedAlert === true;
        setTimeout(() => {
          isBabyCriesDetectedAlert === false;
        }, 60000); // Reset after 1 minute
      }

      const [fanStatus, secondLatestFanStatus] = await getLatestBoolValue(
        'FanStatus',
        'Status',
      );
      const isFanOn = fanStatus === 'On';

      await BackgroundService.updateNotification({
        taskDesc:
          'Caring for Your Little One. Body temperature is: ' +
          babyTemperatureValue +
          '°C',
      });

      await sleep(delay);

      console.log(
        'Now i am checking that is humidity alert is ',
        isHumidityDetectedAlert,
      );
      i++;
      if (i > 86400) break;
    }
  } catch (error) {
    console.error('Error in veryIntensiveTask:', error);
    console.log('Task Error:', 'An error occurred during the task.');
  }
};
