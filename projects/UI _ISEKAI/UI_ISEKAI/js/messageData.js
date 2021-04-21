// Contains the data which control the message conversations. Called in messages.js

let aki = [{
        "path": "intro", // Each section of the conversation is s;lit up into sections referred to as paths
        "messages": [{
                "text": "It has been a while. Peace and greetings to you", // Carries the message
                "author": "Aki"
            },
            {
                "text": "Tell me how your week has been going",
                "author": "Aki"
            }
        ],
        "choices": [
            {
                "path": "block1",
                "text": "Meh",
                "type": "input"
            },
            {
                "path": "block1",
                "text": "Meh",
                "type": "button",
                "pathTrue": "block1-correct",
                "pathFalse": "block1-correct"// Both lead to the same path since this conversation is meant to go in one direction
            }
        ]
    }, {
        "path": "block1-correct",
        "messages": [{
                "text": "I hope that your work has not been stressing you out too much. Do remember to take breaks and spend time connecting with nature :)",
                "author": "Aki"
            }
        ],
        "choices": [{
                "path": "block2",
                "text": "I appreciate it. How have you been",
            }
        ]
    }, {
        "path": "block2",
        "messages": [
            {
                "text": "It has been alright. Still had to suffer a few panic attacks this week, but the 4 7 8 breathing technique I learned about has been super helpful in coping with them. How do you like to cope with feelings of stress and uneasiness?",
                "author": "Aki"
            }
        ],
        "choices": [
            {
                "path": "block2",
                "text": "Meh",
                "type": "input"
            },
            {
                "path": "block2",
                "text": "Meh",
                "type": "button",
                "pathTrue": "block2-correct",
                "pathFalse": "block2-correct"
            }
        ]
    }, {
        "path": "block2-correct",
        "messages": [{
                "text": "Good to hear. I have a few tasks to attend to on Tendr. Don't forget to respond to the emails from. Also, you should definetly start taking care of your virtual garden. I've been having so much fun with mine",
                "author": "Aki"
            }
        ]
    }];
