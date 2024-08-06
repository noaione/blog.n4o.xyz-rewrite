import * as AsciinemaPlayer from "asciinema-player";

export default defineNuxtPlugin((nuxtApp) => {
  const allCinemas: AsciinemaPlayer.AsciinemaPlayer<HTMLElement>[] = [];

  nuxtApp.hook("page:finish", () => {
    const selector = "[data-asciinema]";
    const asciinemaPlayers = document.querySelectorAll<HTMLElement>(selector);

    asciinemaPlayers.forEach((handler) => {
      const castUrl = handler.getAttribute("data-asciinema")!;

      const player = AsciinemaPlayer.create(castUrl, handler, {
        preload: true,
        fit: "width",
        idleTimeLimit: 3,
      });

      allCinemas.push(player);
    });
  });

  onBeforeUnmount(() => {
    // Dispose all players
    allCinemas.forEach((player) => player.dispose());
  });
});
