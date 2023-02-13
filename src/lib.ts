import { ButtonStyle, ComponentType } from "discord.js";

export function components(published: boolean, severity?: string): any[] {
    if (published)
        return [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        style: ButtonStyle.Danger,
                        customId: "rescind",
                        label: "Rescind",
                    },
                    ...(severity === "p2"
                        ? [
                              {
                                  type: ComponentType.Button,
                                  style: ButtonStyle.Primary,
                                  customId: "escalate:p1",
                                  label: "SEV: P1",
                              },
                          ]
                        : []),
                    ...(severity !== "p0"
                        ? [
                              {
                                  type: ComponentType.Button,
                                  style: ButtonStyle.Danger,
                                  customId: "escalate:p0",
                                  label: "SEV: P0",
                              },
                          ]
                        : []),
                ],
            },
        ];

    return [
        {
            type: ComponentType.ActionRow,
            components: [
                {
                    type: ComponentType.Button,
                    style: ButtonStyle.Secondary,
                    customId: "sev:p2",
                    label: "SEV: P2",
                    disabled: severity === "p2",
                },
                {
                    type: ComponentType.Button,
                    style: ButtonStyle.Primary,
                    customId: "sev:p1",
                    label: "SEV: P1",
                    disabled: severity === "p1",
                },
                {
                    type: ComponentType.Button,
                    style: ButtonStyle.Danger,
                    customId: "sev:p0",
                    label: "SEV: P0",
                    disabled: severity === "P0",
                },
            ],
        },
        {
            type: ComponentType.ActionRow,
            components: [
                {
                    type: ComponentType.Button,
                    style: ButtonStyle.Success,
                    customId: "publish",
                    label: "PUBLISH",
                },
            ],
        },
    ];
}
