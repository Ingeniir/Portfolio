import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "hoareau.cedric97470@gmail.com";

export async function POST(req: Request) {
  console.log("Clé API chargée:", process.env.RESEND_API_KEY ? "OK" : "Non trouvée")
  try {
    const body = await req.json();
    const { email, subject, info, projectName, projectDetails, other } = body;

    if (!email || !subject) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    let contentHtml = "";
    let subjectLine = "";

    if (subject === "information") {
      subjectLine = "Demande d'information — Portfolio";
      contentHtml = `
        <p><strong>Sujet :</strong> Information</p>
        <p><strong>Message :</strong></p>
        <p>${info || "Aucun message"}</p>
      `;
    } else if (subject === "projet") {
      subjectLine = `Proposition de projet : ${projectName || "Sans nom"} — Portfolio`;
      contentHtml = `
        <p><strong>Sujet :</strong> Projet</p>
        <p><strong>Nom du projet :</strong> ${projectName || "—"}</p>
        <p><strong>Détails :</strong></p>
        <p>${projectDetails || "Aucun détail fourni"}</p>
      `;
    } else if (subject === "autres") {
      subjectLine = "Nouveau message — Portfolio";
      contentHtml = `
        <p><strong>Sujet :</strong> Autres</p>
        <p><strong>Message :</strong></p>
        <p>${other || "Aucun message"}</p>
      `;
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: subjectLine,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: sans-serif; color: #111; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 24px;">
              Nouveau message — Portfolio de Hoareau Cédric
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin-bottom: 24px;" />
            <p><strong>De :</strong> ${email}</p>
            ${contentHtml}
            <hr style="border: none; border-top: 1px solid #eee; margin-top: 32px; margin-bottom: 16px;" />
            <p style="font-size: 11px; color: #bbb;">
              Ce message a été envoyé depuis le formulaire de contact de ton portfolio.
            </p>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}