import { Problem } from "@/lib/types";

// This demo intentionally ships only 2 problems (one code, one design) to
// keep the hackathon build focused. The full problem set lives on the real
// product at https://systema-sd.in.
export const problems: Problem[] = [
  {
    slug: "word-frequency-counter",
    title: "Word Frequency Counter",
    type: "CODE",
    difficulty: "EASY",
    tags: ["LLD", "Hash Map", "Easy", "Counting"],
    statement:
      "Count words as they arrive. Process commands from stdin, one per line.\n\n" +
      "Commands:\n" +
      "- ADD <word>: record one occurrence of <word>.\n" +
      "- COUNT <word>: print how many times <word> has been recorded (0 if never).\n" +
      "- DISTINCT: print the number of distinct words recorded so far.\n\n" +
      "Words are single tokens with no spaces and are case-sensitive.",
    starterCode:
      "// lines: array of strings, each an ADD, COUNT, or DISTINCT command.\n" +
      "// Return an array of the printed outputs, in order (one per COUNT/DISTINCT command).\n" +
      "function processCommands(lines) {\n  // write your solution\n}\n",
    sampleIO: [
      {
        input: "ADD cat\nADD dog\nADD cat\nCOUNT cat\nCOUNT dog\nCOUNT bird",
        output: "2, 1, 0",
      },
      {
        input: "ADD a\nADD a\nADD a\nDISTINCT\nCOUNT a",
        output: "1, 3",
      },
    ],
  },
  {
    slug: "login-throttle",
    title: "Login Throttle",
    type: "DESIGN",
    difficulty: "EASY",
    tags: ["Rate Limiter", "System Design", "Security", "Easy"],
    statement:
      "Design the backend for a login endpoint that must resist password guessing. " +
      "If anyone can try passwords as fast as they like, an attacker can brute-force accounts. " +
      "The endpoint therefore needs to limit how many login attempts a client may make in a given window.\n\n" +
      "The one idea this design introduces is a rate limiter on an incoming path: place a rate limiter " +
      "in front of the application servers so that excess login attempts from a client are rejected before " +
      "they reach the login logic. Build on the basic web-app shape and add the limiter between the load " +
      "balancer and the application tier.\n\n" +
      "Lay out the architecture, then think through the trade-offs, such as choosing a limit that stops " +
      "attackers without locking out legitimate users who mistype a password.\n\n" +
      "Suggested components: Client, Load Balancer, Rate Limiter, API Server, Database.",
    paletteHint: ["Client", "Load Balancer", "Rate Limiter", "API Server", "Database"],
  },
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}
