// Contains the data which control the message conversations. Called in messages.js

let aki = [
  {
    path: "intro", // Each section of the conversation is s;lit up into sections referred to as paths
    messages: [
      {
        text: "It has been a while. Peace and greetings to you", // Carries the message
        author: "Aki",
      },
      {
        text: "Tell me how your week has been going",
        author: "Aki",
      },
    ],
    choices: [
      {
        path: "block1",
        text: "Meh",
        type: "input",
      },
      {
        path: "block1",
        text: "Meh",
        type: "button",
        pathTrue: "block1-correct",
        pathFalse: "block1-correct", // Both lead to the same path since this conversation is meant to go in one direction
      },
    ],
  },
  {
    path: "block1-correct",
    messages: [
      {
        text:
          "I hope that your work has not been stressing you out too much. Do remember to take breaks and spend time connecting with nature :)",
        author: "Aki",
      },
    ],
    choices: [
      {
        path: "block2",
        text: "I appreciate it. How have you been",
      },
    ],
  },
  {
    path: "block2",
    messages: [
      {
        text:
          "It has been alright. Still had to suffer a few panic attacks this week, but the 4 7 8 breathing technique I learned about has been super helpful in coping with them. How do you like to cope with feelings of stress and uneasiness?",
        author: "Aki",
      },
    ],
    choices: [
      {
        path: "block2",
        text: "Meh",
        type: "input",
      },
      {
        path: "block2",
        text: "Meh",
        type: "button",
        pathTrue: "block2-correct",
        pathFalse: "block2-correct",
      },
    ],
  },
  {
    path: "block2-correct",
    messages: [
      {
        text:
          "Good to hear. I have a few tasks to attend to on Tendr. Don't forget to respond to the emails from. Also, you should definetly start taking care of your virtual garden. I've been having so much fun with mine",
        author: "Aki",
      },
    ],
    choices: [
      {
        path: "block2",
        text: "Meh",
        type: "input",
      },
      {
        path: "block2",
        text: "Meh",
        type: "button",
        pathTrue: "block3",
        pathFalse: "block3",
      },
    ],
  },
  {
    path: "block3",
    messages: [
      {
        text:
          "**Aki has enabled focused mode. She will not receive a notification for this message. Type 'URGENT' if you would like them to receive a notification for it**",
        author: "Chat",
      },
    ],
    choices: [
      {
        path: "block3",
        text: "Meh",
        type: "input",
      },
      {
        path: "block3",
        text: "Meh",
        type: "button",
        expected: "URGENT",
        pathTrue: "block4",
        pathFalse: "block3",
      },
    ],
  },
  {
    path: "block4",
    messages: [
      {
        text: "Hey what was urgent about that message? Let me work >:(",
        author: "Aki",
      },
    ],
    choices: [
      {
        path: "block4",
        text: "Meh",
        type: "input",
      },
      {
        path: "block4",
        text: "Meh",
        type: "button",
        pathTrue: "block3",
        pathFalse: "block3",
      },
    ],
  },
];

//================================================================================================================================

let musa = [
  {
    path: "intro",
    messages: [
      {
        text: "Peace and greetings! How's it going? ",
        author: "Musa",
      },
      {
        text:
          "Are you seeing how terribly our town is doing on the cultural awareness index? We used to be so much better back in my day.",
        author: "Musa",
      },
      {
        text:
          "I've come up with a quiz with some questions you should know the answers to. Are you ready to be quizzed?",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "block1-correct",
        text: "Yeah let's go",
      },
    ],
  },
  {
    path: "block1-correct",
    messages: [
      {
        text:
          "What does the greeting used by Muslims called 'As-salamu alaykum' translate to?",
        author: "Musa",
      },
      {
        text: "A) Peace and Greetings",
        author: "Musa",
      },
      {
        text: "B) Peace be upon you",
        author: "Musa",
      },
      {
        text: "C) What's up my G",
        author: "Musa",
      },
      {
        text: "(Just type the letter in caps)",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "block1-correct",
        text: "Meh",
        type: "input",
      },
      {
        path: "block1-correct",
        text: "Meh",
        type: "button",
        expected: "B",
        pathTrue: "block2",
        pathFalse: "block1-wrong",
      },
    ],
  },
  {
    path: "block1-wrong",
    messages: [
      {
        text: "Wrong Answer!",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "block1-correct",
        text: "Try Again",
        write: false,
      },
    ],
  },
  {
    path: "block2",
    messages: [
      {
        text:
          "Correct! It's beautiful and not too far from the 'peace and greetings' we say here in Narni",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "block3",
        text: "Next question",
      },
    ],
  },
  {
    path: "block3",
    messages: [
      {
        text: "Which religon is most commonly practiced by Tibetan people",
        author: "Musa",
      },
      {
        text: "A) Buddhism",
        author: "Musa",
      },
      {
        text: "B) Christianity",
        author: "Musa",
      },
      {
        text: "C) Islam",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "block3",
        text: "Meh",
        type: "input",
      },
      {
        path: "block3",
        text: "Meh",
        type: "button",
        expected: "A",
        pathTrue: "block3-correct",
        pathFalse: "block3-wrong",
      },
    ],
  },
  {
    path: "block3-correct",
    messages: [
      {
        text:
          "Ding ding ding! Most Tibetans generally observe a form of Buddhism referred to as 'Tibetan Buddhism' or a collection of native traditions known as Bön",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "block4",
        text: "Next question",
      },
    ],
  },
  {
    path: "block4",
    messages: [
      {
        text:
          "What is the annual festival carried out in Trinidad Tobago held on the Monday and Tuesday before Ash Wednesday?",
        author: "Musa",
      },
      {
        text: "A) J'ouvert",
        author: "Musa",
      },
      {
        text: "B) Carnival",
        author: "Musa",
      },
      {
        text: "C) Reggae Fest",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "block4",
        text: "Meh",
        type: "input",
      },
      {
        path: "block4",
        text: "Meh",
        type: "button",
        expected: "B",
        pathTrue: "conclusion",
        pathFalse: "block4-wrong",
      },
    ],
  },
  {
    path: "block3-wrong",
    messages: [
      {
        text: "Wrong Answer!",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "block3",
        text: "Try Again",
        write: false,
      },
    ],
  },
  {
    path: "block4-wrong",
    messages: [
      {
        text: "Wrong Answer!",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "block4",
        text: "Try Again",
        write: false,
      },
    ],
  },
  {
    path: "conclusion",
    messages: [
      {
        text:
          "Good job! Feel free to thank me for being enlightened by treating me to some deep fried bannock. See you soon hpoefully!",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "conclusion",
        text: "Meh",
        type: "input",
      },
      {
        path: "conclusion",
        text: "Meh",
        type: "button",
        pathTrue: "busy",
        pathFalse: "busy",
      },
    ],
  },
  {
    path: "busy",
    messages: [
      {
        text:
          "**Musa has enabled focused mode. She will not receive a notification for this message. Type 'URGENT' if you would like them to receive a notification for it**",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "busy",
        text: "Meh",
        type: "input",
      },
      {
        path: "conclusion",
        text: "Meh",
        expected: "URGENT",
        type: "button",
        pathTrue: "final",
        pathFalse: "busy",
      },
    ],
  },
  {
    path: "final",
    messages: [
      {
        text: "Shush I'm watching Parasite",
        author: "Musa",
      },
    ],
    choices: [
      {
        path: "final",
        text: "Meh",
        type: "input",
      },
      {
        path: "conclusion",
        text: "Meh",
        type: "button",
        pathTrue: "busy",
        pathFalse: "busy",
      },
    ],
  },
];
