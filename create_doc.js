import { Document, Packer, Paragraph, TextRun } from "docx"
import * as fs from "fs";

async function saveDocumentToFile(doc, fileName) {
    try {
        var buffer = await Packer.toBuffer(doc)
        fs.writeFileSync(fileName, buffer)
        return true
    } catch(e) {
        console.log("Error saving file.")
        return false
    }
  }

export function deleteFile(path) {
    fs.unlinkSync(path)
}

export async function generateWordDocument(params) {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Name: ",
                            bold: true,
                        }),
                        new TextRun(params.name),
                        
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "OOC Reason: ",
                            bold: true,
                        }),
                        new TextRun(params.reason,),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Recommended for recourse: ",
                            bold: true,
                        }),
                        new TextRun(params.recommendation),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Additional comments: ",
                            bold: true,
                        }),
                        new TextRun(params.comment),
                    ]
                }) 
            ],
        }]
    });
    var status = await saveDocumentToFile(doc, "report.doc")
    return status
  }
