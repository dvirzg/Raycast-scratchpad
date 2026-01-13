import { Form, LocalStorage } from "@raycast/api";
import { useEffect, useState } from "react";

export default function Command() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    LocalStorage.getItem<string>("scratchpad").then((value) => {
      if (value) setText(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        LocalStorage.setItem("scratchpad", text);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [text, isLoading]);

  return (
    <Form isLoading={isLoading}>
      <Form.TextArea id="scratchpad" value={text} onChange={setText} />
    </Form>
  );
}
