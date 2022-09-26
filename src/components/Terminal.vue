<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";

const terminalEl = ref<HTMLElement>();

const ANSI_EOL = "\r\n";
const ANSI_DEL = "\b \b";
// \x1b[(文字装饰);(颜色代码):
const ANSI_COLOR_RED = "\x1b[31m";
const ANSI_COLOR_GREEN = "\x1b[32m";
const ANSI_COLOR_YELLOW = "\x1b[33m";
const ANSI_COLOR_BLUE = "\x1b[34m";
const ANSI_COLOR_MAGENTA = "\x1b[35m";
const ANSI_COLOR_CYAN = "\x1b[36m";
const ANSI_COLOR_RESET = "\x1b[0m";

onMounted(() => {
  if (terminalEl.value) {
    const terminal = new Terminal({
      disableStdin: false,
      allowProposedApi: true,
      theme: {
        foreground: "#e8fc86",
        background: "#202020",
      },
    });

    const socket = new WebSocket("ws://localhost:3000");

    const attachAddon = new AttachAddon(socket);
    terminal.loadAddon(attachAddon);

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalEl.value);
    fitAddon.fit();

    // fake tty process
    // const PROPMPT_SYMBLE = "$ ";
    // const prompt = () =>
    //   terminal.write(`${ANSI_COLOR_RED}${PROPMPT_SYMBLE}${ANSI_COLOR_RESET}`);
    // prompt();

    // terminal.onKey((e) => {
    //   const ev = e.domEvent;

    //   const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
    //   if (printable) {
    //     terminal.write(e.key);
    //   }

    //   if (ev.key === "Enter") {
    //     terminal.write(ANSI_EOL);
    //     // todo fake cmd
    //     prompt();
    //   } else if (ev.key === "Backspace") {
    //     // @ts-expect-error
    //     if (terminal._core.buffer.x > PROPMPT_SYMBLE.length) {
    //       terminal.write(ANSI_DEL);
    //     }
    //   }
    // });
    // terminal.onData((data) => {
    //   // handle paste
    //   if (data.length > 1) {
    //     terminal.write(data);
    //   }
    // });
  }
});
</script>

<template>
  <div id="terminal" ref="terminalEl"></div>
</template>

<style scoped></style>
