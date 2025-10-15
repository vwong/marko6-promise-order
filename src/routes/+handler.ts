class ServerError extends Error {}

const rejectAfter = (duration: number) =>
  new Promise((_, reject) => {
    setTimeout(
      () => reject(new ServerError("only meant for server")),
      duration,
    );
  });

const resolveAfter = (duration: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

const FAST = 20;
const MEDIUM = 50;
const SLOW = 100;

export const GET: MarkoRun.Handler = async (context) => {
  const { headers } = context.request;
  const isHardReload =
    headers.get("pragma") === "no-cache" || // Safari, Firefox
    headers.get("cache-control") === "no-cache"; // Chrome
  context.loader = {
    promiseRejection: rejectAfter(MEDIUM),
    promiseResolution: resolveAfter(isHardReload ? SLOW : FAST),
  };
  context.loader.promiseRejection.catch(() => {});
};
