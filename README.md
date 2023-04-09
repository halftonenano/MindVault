## Inspiration
Nearly every member of this team has a family member that suffers or has suffered from dementia. The experience of watching a loved one's mind and memories decay is something **nobody** should have to undergo. MindVault was developed as a means by which to slow the loss of precious memories, both for patients with neurodegenerative disease and for the layman that simply wishes to remember their happiest moments.

## What it does
MindVault prompts users to input memories or thoughts they value or would like to remember (i.e, my son's name is Joseph; I swam with dolphins in Mexico five years ago). These inputs are embedded into a vector database with over 1500 dimensions and assigned to a user id in supabase, allowing for similar memories to be grouped together. In a typical notes app, in order to search for a note, you need to remember what was in the note beforehand. For obvious reasons, this system fails to accommodate individuals with forms of dementia or those who are merely forgetful, proving to be a large inconvenience. MindVault solves this issue through the use of an NLP model in the form of GPT3.5. Instead of searching for a given note, one simply has to ask a question to the personalized model and receive a response in easy-to-understand, brief, natural language.

## How we built it
The website was built using the liveShare extension in VSCode. This library allowed for all three members of the team to collaborate on the same project. We then developed the rest of the project by either collaborating to accomplish challenging goals, or diving and conquering when it came to more menial busywork.

## Challenges we ran into
Our initial goals were much more ambitious. We had visions of peer-to-peer connections to improve security, python APIs, and an entirely different database (chromadb) dedicated to fast vector searches. We quickly realized, however, that there were too many problems originating from these plans, mostly stemming from technical difficulties and failures in installing the required dependencies. Thus, we had to cut back on our plans to ensure the key features were properly implemented.

## Accomplishments that we're proud of
- Emergent capabilities of using GPT3.5
- Integrating the unique properties of vector databases with an NLP to optimize results
- General UI and web design

## What we learned
- This was the first project wherein any of us had used vector databases, requiring us to acquire a surplus of new knowledge to accomplish our objectives
- Most of the team is unfamiliar with Supabase, so this project was the perfect opportunity to gain more familiarity with the platform as a whole.

## What's next for MindVault
- Ideally, this prototype would be developed into a full application with its own unique mobile app.
- There is lots of room for improvement on the design and efficiency, and we intend to live up to MindVault's potential.
