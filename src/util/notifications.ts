import { NotificationMessage } from "../domain/model/notificationMessage";

async function sendPushNotification(message: NotificationMessage) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export async function sendCarNotification(pushToken: string, name: string) {
  const message = {
    to: pushToken,
    sound: 'default',
    title: 'Por gentileza, manobre seu carro ',
    body: `Seu carro está trancando o carro de ${name}.'`,
  };

  sendPushNotification(message)
}
