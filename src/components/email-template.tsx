import * as React from "react";

interface EmailTemplateProps {
  Email: string;
  Message: string;
}

export async function EmailTemplate({ Email, Message }: EmailTemplateProps) {
  return (
    <div>
      <b>Hi bhavesh you got an message from {Email}</b>
      <br />
      <p>{Message}</p>
    </div>
  );
}
