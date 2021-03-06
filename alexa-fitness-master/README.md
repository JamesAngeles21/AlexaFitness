alexa-fitness

Website to store workout plan
	-> alexa and website connects to folder on computer
	-> when you download a program off the website. It connects to folder and downloads to specific folder

Writing workout plan
	-> Tracks the day you are on, depending on when you started the workout
			-> will have an * (asterisk) next to the day if you have completed the exercise or workout

	-> Each line
		-> <exercise type>: <exercise>, <unit:weight>, <sets> <reps>

	-> 2 types of exercises
		- time based exercise
		- rep based exercise

	-- Example plan --
		Day 1: *
			Rep: Squat, lbs:100, sets:3 reps:5 *
			Rep: Walking Lunges, lbs:0, sets:3 reps:8 *
			Tim: Planks, lbs:0, secs:30 mins:1 *
		!!
		Day 2: 
			Rep: Bench Press, lbs:100, sets:3 reps:5 *
			Rep: Pullup, lbs:0, sets:3 reps:8 *
			Tim: Running, lbs:0, mins:10
			Tim: Planks, lbs:0, secs:30
			Tim: Pullup Holds, lbs:20, secs:30 mins:1
		!!
		Day 3: 
			Rep: Squat, lbs:100, sets:3 reps:5
			Rep: Walking Lunges, lbs:0, sets:3 reps:8
			Tim: Planks, lbs:0, secs:30 mins:1
		!!
	-- Example plan fin --

	-> Day 1 is a completed exercise
	-> each day is seperated by an '!!'
	-> Day 2 has 2 completed exercises but is not complete


Interacting with Alexa's workout plan

	-> Starting
		- "alexa start workout"
			- loads your default workout
		- "alexa start workout <filename>"
			-loads a workout under this name
		- "alexa set default workout <filename>"

	-> Time based exercise
		- "alexa start exercise"
		- doesn't need "alexa finished exercise"
		~ "alexa time left"

	-> Rep based exercise
		- "alexa start exercise"
		- needs "alexa finished exercise"

	-> Interaction based on the example plan

	-- Example plan --
		Day 1: *
			Rep: Squat, lbs:100, sets:3 reps:5 *
			Rep: Walking Lunges, lbs:0, sets:3 reps:8 *
			Tim: Planks, lbs:0, secs:30 mins:1 *
		!!
		Day 2: 														
				-alexa start workout (auto starts first exercise) > bench press 100 pounds 5 reps 
			Rep: Bench Press, lbs:100, sets:3 reps:5 
				- alexa finished exercise > bench press 100 pounds 5 reps 
				- alexa finished exercise > bench press 100 pounds 5 reps 
				- alexa finished exercise > pullup 0 pounds 8 reps (mark bench press with *)
			Rep: Pullup, lbs:0, sets:3 reps:8 
				- alexa finished exercise > pullup 0 pounds 8 reps 
				- alexa finished exercise > pullup 0 pounds 8 reps 
				- alexa finished exercise > running 0 pounds 10 minutes	(mark pullup with *)	
			Tim: Running, lbs:0, sets:1 mins:10
				~ alexa time left > 30 seconds
				- alexa finished exercise > planks 0 pounds 30 seconds (mark running with *)
			Tim: Planks, lbs:0, sets:2 secs:30 
				- alexa finished exercise > planks 0 pounds 30 seconds
				- alexa finished exercise > pullup holds 0 pounds 30 seconds (mark planks with *)
			Tim: Pullup Holds, lbs:20, sets:1 secs:30 mins:1
				- alexa finished exercise > workout finished(ends program, marks day with *)
		!!
		Day 3: 
			Rep: Squat, lbs:100, sets:3 reps:5
			Rep: Walking Lunges, lbs:0, sets:3 reps:8
			Tim: Planks, lbs:0, secs:30 mins:1
		!!
	-- Example plan fin --









