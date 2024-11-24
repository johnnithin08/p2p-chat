export function createMessage(msg, local = false) {
  return {
    timestamp: new Date().toISOString(),
    message: msg,
    local,
    type: "text",
  };
}
