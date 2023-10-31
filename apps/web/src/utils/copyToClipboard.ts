export const copyToClipboardFallback = (text: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Make the text area invisible
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "1px";
    textArea.style.height = "1px";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      console.error("Unable to copy to clipboard:", err);
      resolve(false);
    }
  });
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};
