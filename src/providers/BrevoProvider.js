const brevo = require('@getbrevo/brevo')
import { env } from '~/config/environment'

let apiInstance = new brevo.TransactionalEmailsApi()

let apiKey = apiInstance.authentications['apiKey']
apiKey.apiKey = env.BREVO_API_KEY

const sendEmail = async (recipientEmail, customSubject, htmlContent) => {
  // Khởi tạo một cái sendSmtpEmail
  let sendSmtpEmail = new brevo.SendSmtpEmail()
  // Tài khoản gửi email: Là tài khoản admin email, đăng ký tài khoản trên brevo
  sendSmtpEmail.sender = { email: env.ADMIN_EMAIL_ADDRESS, name: env.ADMIN_EMAIL_NAME }
  // Nhứng tài khoản nhận mail
  // 'to' phải là 1 array để sau có thể tuỳ biến gửi email đến nhiều users
  sendSmtpEmail.to = [{ email: recipientEmail }]
  // Tiêu đề của email
  sendSmtpEmail.subject = customSubject
  // Nội dung của email dạng HTML
  sendSmtpEmail.htmlContent = htmlContent
  // Gọi hành động gửi email
  return apiInstance.sendTransacEmail(sendSmtpEmail)
}

export const BrevoProvider = {
  sendEmail
}
