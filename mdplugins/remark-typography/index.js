import { findAndReplace } from "mdast-util-find-and-replace";

export default function remarkTypography() {
  return (ast) => {
    findAndReplace(ast, [
      // Copyright symbol
      [/\(c\)/gi, "©"],
      // Registered trademark symbol
      [/\(r\)/gi, "®"],
      // Trademark symbol
      [/\(tm\)/gi, "™"],
      // Paragraph symbol
      [/\(p\)/gi, "§"],
      // Plus-minus symbol
      [/\+-/g, "±"],
      // en-dash
      [/--/g, "–"],
      // em-dash
      [/---/g, "—"],
      // the correct interrobang !? -> ?!
      [/!\?/g, "?!"],
    ]);
  };
}
