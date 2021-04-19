var chatz = [{
        "path": "intro",
        "messages": [{
                "text": "It has been a while. Peace and greetings to you",
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
                "write": false,
                "pathTrue": "block1-correct",
                "pathFalse": "block1-wrong"
            }
        ]
    }, {
        "path": "block1-correct",
        "messages": [{
                "text": "You got it, good job",
                "author": "Aki"
            }
        ],
        "choices": [{
                "path": "block2",
                "text": "Continue",
                "write": false
            }
        ]
    }, {
        "path": "block1-wrong",
        "messages": [{
                "text": "Wrong Answer!",
                "author": "ConvoJs"
            }
        ],
        "choices": [{
                "path": "intro",
                "text": "Try Again",
                "write": false
            }
        ]
    },{
        "path": "block2",
        "messages": [
            {
                "text": "Now, what is 2 + 3?",
                "author": "ConvoJs"
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
                "expected": "5",
                "pathTrue": "block2-correct",
                "pathFalse": "block2-wrong"
            }
        ]
    }, {
        "path": "block2-correct",
        "messages": [{
                "text": "Fantastic! ",
                "author": "ConvoJs"
            }
        ],
        "choices": [{
                "path": "block__",
                "text": "That's all for now!",
                "write": false
            }
        ]
    }, {
        "path": "block2-wrong",
        "messages": [{
                "text": "Wrong Answer!",
                "author": "ConvoJs"
            }
        ],
        "choices": [{
                "path": "intro",
                "text": "Try Again",
                "write": false
            }
        ]
    }];
