import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
	/* Values go here.*/
	scheduleSelection: ScheduleSelection
	schedules: Schedule[]
	timeUntilNextMod: {
		hours: number
		minutes: number
		seconds: number
	}
	timeUntilEndOfDay: {
		hours: number
		minutes: number
		seconds: number
	}
}

type Action = {
	/* Ways to alter the state go here.*/
	setScheduleSelection: (newScheduleSelection: ScheduleSelection) => void
	setTimeUntilNextMod: (timeUntilNextMod: {
		hours: number
		minutes: number
		seconds: number
	}) => void
	setTimeUntilEndOfDay: (timeUntilEndOfDay: {
		hours: number
		minutes: number
		seconds: number
	}) => void
}

export const getScheduleTime = (hours: number, minutes: number) => {
	const time = new Date()
	time.setHours(hours)
	time.setMinutes(minutes)
	return time
}

export const useMainStore = create<State & Action>()(
	//persist(
	//@ts-ignore
	immer((set) => ({
		///////////
		// State //
		///////////
		scheduleSelection: 'REGULAR',
		schedules: [
			{
				name: 'Regular Schedule',
				selectionID: 'REGULAR',
				periods: [
					{
						name: 'Mod One',
						start: getScheduleTime(7, 15),
						end: getScheduleTime(7, 59),
					},
					{
						name: 'Mod Two',
						start: getScheduleTime(8, 2),
						end: getScheduleTime(8, 46),
					},
					{
						name: 'Mod Three',
						start: getScheduleTime(8, 49),
						end: getScheduleTime(9, 33),
					},
					{
						name: 'Mod Four',
						start: getScheduleTime(9, 36),
						end: getScheduleTime(10, 6),
					},
					{
						name: 'Mod Five',
						start: getScheduleTime(10, 9),
						end: getScheduleTime(10, 53),
					},
					{
						name: 'Mod Six',
						start: getScheduleTime(10, 56),
						end: getScheduleTime(11, 40),
					},
					{
						name: 'Mod Seven',
						start: getScheduleTime(11, 43),
						end: getScheduleTime(12, 27),
					},
					{
						name: 'Mod Eight',
						start: getScheduleTime(12, 30),
						end: getScheduleTime(13, 14),
					},
					{
						name: 'Mod Nine',
						start: getScheduleTime(13, 17),
						end: getScheduleTime(14, 5),
					},
				],
			},
			{
				name: 'Rally Schedule',
				selectionID: 'RALLY',
				periods: [
					{
						name: 'Mod One',
						start: getScheduleTime(7, 15),
						end: getScheduleTime(8, 0),
					},
					{
						name: 'Mod Two',
						start: getScheduleTime(8, 3),
						end: getScheduleTime(8, 48),
					},
					{
						name: 'Mod Three',
						start: getScheduleTime(8, 51),
						end: getScheduleTime(9, 41),
					},
					{
						name: 'Mod Five',
						start: getScheduleTime(9, 44),
						end: getScheduleTime(10, 29),
					},
					{
						name: 'Mod Six',
						start: getScheduleTime(10, 32),
						end: getScheduleTime(11, 17),
					},
					{
						name: 'Mod Seven',
						start: getScheduleTime(11, 20),
						end: getScheduleTime(12, 5),
					},
					{
						name: 'Mod Eight',
						start: getScheduleTime(12, 8),
						end: getScheduleTime(12, 53),
					},
					{
						name: 'Mod Nine',
						start: getScheduleTime(12, 56),
						end: getScheduleTime(13, 41),
					},
					{
						name: 'Rally',
						start: getScheduleTime(13, 50),
						end: getScheduleTime(14, 5),
					},
				],
			},
			{
				name: 'Assembly Schedule',
				selectionID: 'ASSEMBLY',
				periods: [
					// {
					// 	name: 'Mod One',
					// 	start: getScheduleTime(7, 15),
					// 	end: getScheduleTime(7, 55),
					// },
					{
						name: 'Mod One',
						start: getScheduleTime(7, 15),
						end: getScheduleTime(7, 55),
					},
					{
						name: 'Mod Two',
						start: getScheduleTime(7, 58),
						end: getScheduleTime(8, 38),
					},
					{
						name: 'Mod Three',
						start: getScheduleTime(8, 41),
						end: getScheduleTime(9, 23),
					},
					{
						name: 'Assembly',
						start: getScheduleTime(9, 26),
						end: getScheduleTime(10, 26),
					},
					{
						name: 'Mod Five',
						start: getScheduleTime(10, 29),
						end: getScheduleTime(11, 9),
					},
					{
						name: 'Mod Six',
						start: getScheduleTime(11, 12),
						end: getScheduleTime(11, 52),
					},
					{
						name: 'Mod Seven',
						start: getScheduleTime(11, 55),
						end: getScheduleTime(12, 35),
					},
					{
						name: 'Mod Eight',
						start: getScheduleTime(12, 38),
						end: getScheduleTime(13, 18),
					},
					{
						name: 'Mod Nine',
						start: getScheduleTime(13, 21),
						end: getScheduleTime(14, 5),
					},
				],
			},
			{
				name: 'Air Schedule',
				selectionID: 'AIR',
				periods: [
					{
						name: 'Air Test',
						start: getScheduleTime(7, 15),
						end: getScheduleTime(9, 15),
					},
					{
						name: 'Mod One',
						start: getScheduleTime(9, 20),
						end: getScheduleTime(9, 48),
					},
					{
						name: 'Mod Two',
						start: getScheduleTime(9, 51),
						end: getScheduleTime(10, 19),
					},
					{
						name: 'Mod Three',
						start: getScheduleTime(10, 22),
						end: getScheduleTime(10, 50),
					},
					{
						name: 'Mod Five',
						start: getScheduleTime(10, 53),
						end: getScheduleTime(11, 33),
					},
					{
						name: 'Mod Six',
						start: getScheduleTime(11, 36),
						end: getScheduleTime(12, 16),
					},
					{
						name: 'Mod Seven',
						start: getScheduleTime(12, 19),
						end: getScheduleTime(12, 59),
					},
					{
						name: 'Mod Eight',
						start: getScheduleTime(13, 2),
						end: getScheduleTime(13, 30),
					},
					{
						name: 'Mod Nine',
						start: getScheduleTime(13, 33),
						end: getScheduleTime(14, 5),
					},
				],
			},
		],

		/////////////
		// Actions //
		/////////////
		setScheduleSelection: (newScheduleSelection) =>
			set((state) => {
				state.scheduleSelection = newScheduleSelection
			}),
		setTimeUntilNextMod: (timeUntilNextMod) =>
			set((state) => {
				state.timeUntilNextMod = timeUntilNextMod
			}),
		setTimeUntilEndOfDay: (timeUntilEndOfDay) =>
			set((state) => {
				state.timeUntilEndOfDay = timeUntilEndOfDay
			}),
	}))
	// {
	// 	// Use Local Storage
	// 	name: 'main-storage',
	// 	storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
	// }
)
//)

// Zustand Documentation
/*
import { create } from 'zustand'

type State = {
  firstName: string
  lastName: string
}

type Action = {
  updateFirstName: (firstName: State['firstName']) => void
  updateLastName: (lastName: State['lastName']) => void
}

// Create your store, which includes both state and (optionally) actions
const usePersonStore = create<State & Action>((set) => ({
  firstName: '',
  lastName: '',
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}))

// In consuming app
function App() {
  // "select" the needed state and actions, in this case, the firstName value
  // and the action updateFirstName
  const firstName = usePersonStore((state) => state.firstName)
  const updateFirstName = usePersonStore((state) => state.updateFirstName)

  return (
	<main>
	  <label>
		First name
		<input
		  // Update the "firstName" state
		  onChange={(e) => updateFirstName(e.currentTarget.value)}
		  value={firstName}
		/>
	  </label>

	  <p>
		Hello, <strong>{firstName}!</strong>
	  </p>
	</main>
  )
}


*/

/*
Deeply nested objects

If you have a deep state object like this:

type State = {
  deep: {
	nested: {
	  obj: { count: number }
	}
  }
}

Updating nested state requires some effort to ensure the process is completed immutably.
Normal approach

Similar to React or Redux, the normal approach is to copy each level of the state object. This is done with the spread operator ..., and by manually merging that in with the new state values. Like so:

  normalInc: () =>
	set((state) => ({
	  deep: {
		...state.deep,
		nested: {
		  ...state.deep.nested,
		  obj: {
			...state.deep.nested.obj,
			count: state.deep.nested.obj.count + 1
		  }
		}
	  }
	})),

This is very long! Let's explore some alternatives that will make your life easier.
With Immer

Many people use Immer to update nested values. Immer can be used anytime you need to update nested state such as in React, Redux and of course, Zustand!

You can use Immer to shorten your state updates for deeply nested object. Let's take a look at an example:

  immerInc: () =>
	set(produce((state: State) => { ++state.deep.nested.obj.count })),
*/
