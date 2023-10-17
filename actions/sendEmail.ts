"use server"

import { extractErrorMessage, validateString } from '@/lib/utils'
import {Resend} from 'resend'
import ContactFormEmail from '@/email/ContactFormEmail'
import React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (formData: FormData) => {
    const senderEmail = formData.get('senderEmail') //email
    const message = formData.get('message')

    if (!validateString(senderEmail, 500)) {
        return {
            error: "Invalid sender email"
        }
    }

    if (!validateString(message, 5000)) {
        return {
            error: "Invalid message"
        }
    }

    let data
    try {
        data = await resend.emails.send({
            from: 'Trabzon Rehberim <onboarding@resend.dev>',
            to: 'melihyardim1057@gmail.com',
            subject: 'Message from Trabzon Rehberim',
            reply_to: senderEmail as string,
            react: React.createElement(ContactFormEmail, {
                message: message as string,
                senderEmail: senderEmail as string
            })
        })
        
    } catch (error: unknown) {
        return {
            error: extractErrorMessage(error)
        }
    }

    return {
        data
    }
  }