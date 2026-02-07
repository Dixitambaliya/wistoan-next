import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        // ---------- validation ----------
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        // ---------- transporter ----------
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // 465 -> true, 587 -> false
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // ---------- send mail ----------
        await transporter.sendMail({
            from: `"Wistoan Website" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_RECEIVER,

            // 🔥 IMPORTANT (reply goes to customer)
            replyTo: email,

            subject: `New Inquiry: ${subject}`,

            html: `
                <h2>New Website Inquiry</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Subject:</b> ${subject}</p>
                <p><b>Message:</b></p>
                <p>${message}</p>
            `
        });

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("MAIL ERROR:", err);

        return NextResponse.json(
            { error: "Email failed" },
            { status: 500 }
        );
    }
}
