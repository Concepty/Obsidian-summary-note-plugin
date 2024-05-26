import { Notice, Plugin, TFolder, TFile } from "obsidian";

const SUMMARY_NOTE = 
`---
tags:
- summary
---
`;

export default class ExamplePlugin extends Plugin {
async onload() {
    this.registerEvent(
        // add summary note
    this.app.workspace.on("file-menu", (menu, file) => {
        if (file instanceof TFolder) {
            menu.addItem((item) => {
                item
                    .setTitle("make summary note 👻")
                    .setIcon("bot")
                    .onClick(async () => {
                        const summaryNotePath = `${file.path}/${file.name}.md`
                        var summaryNote = this.app.vault.getFileByPath(summaryNotePath);
                        if (summaryNote) {
                            new Notice("Summary Note exists!");
                            const leaf = this.app.workspace.getLeaf(false);
                            await leaf.openFile(summaryNote);
                        } else {
                            summaryNote = 
                            await this.app.vault.create(summaryNotePath, SUMMARY_NOTE);
                            new Notice("Added Summary Note 👻");
                        }
                    });
            });
        } else if (file instanceof TFile) {
            menu.addItem((item) => {
                item
                    .setTitle("show summary note 👻")
                    .setIcon("rabbit")
                    .onClick(async () => {
                        const leaf = this.app.workspace.getLeaf(false);
                        const summaryNote = this.app.vault.getFileByPath(
                            `${file.parent?.path}/${file.parent?.name}.md`
                        );
                        if (summaryNote) {
                            await leaf.openFile(summaryNote);
                        } else {
                            new Notice("No Summary Note 👻");
                        }
                    });
            });
        }
    })
    );

this.registerEvent(
        // find summary note and show
    this.app.workspace.on("editor-menu", (menu, editor, view) => {
        menu.addItem((item) => {
            item
                .setTitle("show summary note 👻")
                .setIcon("rabbit")
                .onClick(async () => {
                    const file = this.app.workspace.getActiveFile();
                    if (!file) return;
                    const leaf = this.app.workspace.getLeaf(false);
                    const summaryNote = this.app.vault.getFileByPath(
                        `${file.parent?.path}/${file.parent?.name}.md`
                    );
                    if (summaryNote) {
                        await leaf.openFile(summaryNote);
                    } else {
                        new Notice("No Summary Note 👻");
                    }
                });
        });
    })
    );
}
}
