export function validate(evt: React.KeyboardEvent<HTMLInputElement>) {
  const key = evt.key;
  if (key === "Enter") {
    evt.currentTarget.blur();
    return;
  }
  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
  if (!/[0-9]$/.test(key) && !allowedKeys.includes(key)) {
    evt.preventDefault();
  }
}
