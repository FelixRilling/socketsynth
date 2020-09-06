import { getLogger } from "./logger";
import { createClient, wrapAsJsonClient } from "./messaging/ws";
import type { MidiEvent } from "./audio/midiEvent";
import { pressKey } from "./audio/synth";
import { createKeyboard } from "./audio/keyboard";

const logger = getLogger("main");

const keyboardContainer = document.getElementById("keyboard")!;

createClient(`ws://${location.host}${location.pathname}ws`)
    .then((client) => {
        logger.info("Connected.", client);
        const jsonClient = wrapAsJsonClient<MidiEvent>(client);

        createKeyboard(keyboardContainer, (midiEvent) => {
            jsonClient.publish("/app/midi/input", midiEvent);
        });

        jsonClient.subscribe("/topic/midi/output", (midiEvent) => {
            const release = pressKey(midiEvent);
            setTimeout(() => release(), 500);
        });
    })
    .catch((e) => logger.error("Received error.", e));
