export function getHsl(text, s = 30, l = 80) {
  let str = text,
    hash = 0;

  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let h = hash % 360;
  let hexColor = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';

  return hexColor;
}

export function getInitials(string, length = 2) {
  let names = string.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1 && length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}