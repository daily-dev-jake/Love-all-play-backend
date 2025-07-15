# Love-all-play-backend

## Description
Backend for **[Love-all-play](https://love-all-play.onrender.com)**
For frontend: **[https://github.com/daily-dev-jake/Love-All-Play](https://github.com/daily-dev-jake/Love-All-Play)**
---
Problem statement: Badminton Player wants to track score because might not be able to remember their scores.
Solution: A score tracking app is needed
User requests: Track within the least amount of interactions
---

## Guest User Flow 
1. **Badminton Player** / Spectator / Judge can use **Love-all-play** as a **Guest User**.
2. **User** *enters* names of both **Players** for the corresponding sides of the net.
3. When a **Player** wins a **Game point**, the **User** has to *tap* on the court of the winning side.
4. Every time there is a new **Game** winner, the **Game scores** will be reset to 0 but the **Game point** will increase by one for the winner. The **Player Names** and corresponding **Game scores** will be *saved* into to their local phone. (*database* is only for registered users).
5. Eventually, after the best of 3 **Games**, the final **Match** winner will be victorious. Both **Games** and **Match points** will be reset.
6. **Users** will be able to see their past **scores** when needed.

## Scoring system for Badminton ([Rules from badmintonnl.ca](https://www.badmintonnl.ca/resources/simplified-rules/))

- A match consists of the best of 3 games of 21 points.
- Every time there is a serve – there is a point scored.
- The side winning a rally adds a point to its score.
- At 20 all, the side which gains a 2 point lead first, wins that game.
- At 29 all, the side scoring the 30th point, wins that game.
- The side winning a game serves first in the next game.

## Minimum Features
### Guest features
- Score counter
- Save player names
- Serve indicator
- Google auth login 

### Auth users 
- Saving player names
- Match / Game points
