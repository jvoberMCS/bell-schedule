import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
	/* Values go here.*/
	scheduleSelection: ScheduleSelection
	schedules: Schedule[]
}

type Action = {
	/* Ways to alter the state go here.*/
	setScheduleSelection: (newScheduleSelection: ScheduleSelection) => void
}

//Converts a time from the current day into the number of ms since the epoch
export const GetMsFromScheduleTime = (hour: Hour, minute: Minute) => {
	let startTime = new Date(Date.now())
	startTime.setHours(hour)
	startTime.setMinutes(minute)
	return startTime.getTime()
}

export const useMainStore = create<State & Action>()(
	//persist(
	//@ts-ignore
	immer((set) => ({
		///////////
		// State //
		///////////
		scheduleSelection: 'NORMAL',
		schedules: [
			{
				name: 'Normal Schedule',
				selectionID: 'NORMAL',
				periods: [
					{
						name: 'One',
						start: GetMsFromScheduleTime(7, 15),
						end: GetMsFromScheduleTime(7, 59),
					},
					{
						name: 'Two',
						start: GetMsFromScheduleTime(8, 2),
						end: GetMsFromScheduleTime(8, 46),
					},
					{
						name: 'Three',
						start: GetMsFromScheduleTime(8, 49),
						end: GetMsFromScheduleTime(9, 33),
					},
					{
						name: 'Four',
						start: GetMsFromScheduleTime(9, 36),
						end: GetMsFromScheduleTime(10, 6),
					},
					{
						name: 'Five',
						start: GetMsFromScheduleTime(10, 9),
						end: GetMsFromScheduleTime(10, 53),
					},
					{
						name: 'Six',
						start: GetMsFromScheduleTime(10, 56),
						end: GetMsFromScheduleTime(11, 40),
					},
					{
						name: 'Seven',
						start: GetMsFromScheduleTime(11, 43),
						end: GetMsFromScheduleTime(12, 27),
					},
					{
						name: 'Eight',
						start: GetMsFromScheduleTime(12, 30),
						end: GetMsFromScheduleTime(13, 14),
					},
					{
						name: 'Nine',
						start: GetMsFromScheduleTime(13, 17),
						end: GetMsFromScheduleTime(14, 5),
					},
				],
			},
			{
				name: 'Rally Schedule',
				selectionID: 'RALLY',
				periods: [
					{
						name: 'One',
						start: GetMsFromScheduleTime(7, 15),
						end: GetMsFromScheduleTime(8, 0),
					},
					{
						name: 'Two',
						start: GetMsFromScheduleTime(8, 3),
						end: GetMsFromScheduleTime(8, 48),
					},
					{
						name: 'Three',
						start: GetMsFromScheduleTime(8, 51),
						end: GetMsFromScheduleTime(9, 41),
					},
					{
						name: 'Five',
						start: GetMsFromScheduleTime(9, 44),
						end: GetMsFromScheduleTime(10, 29),
					},
					{
						name: 'Six',
						start: GetMsFromScheduleTime(10, 32),
						end: GetMsFromScheduleTime(11, 17),
					},
					{
						name: 'Seven',
						start: GetMsFromScheduleTime(11, 20),
						end: GetMsFromScheduleTime(12, 5),
					},
					{
						name: 'Eight',
						start: GetMsFromScheduleTime(12, 8),
						end: GetMsFromScheduleTime(12, 53),
					},
					{
						name: 'Nine',
						start: GetMsFromScheduleTime(12, 56),
						end: GetMsFromScheduleTime(13, 41),
					},
					{
						name: 'Rally',
						start: GetMsFromScheduleTime(13, 50),
						end: GetMsFromScheduleTime(14, 5),
					},
				],
			},
			{
				name: 'Assembly Schedule',
				selectionID: 'ASSEMBLY',
				periods: [
					{
						name: 'One',
						start: GetMsFromScheduleTime(7, 15),
						end: GetMsFromScheduleTime(7, 55),
					},
					{
						name: 'Two',
						start: GetMsFromScheduleTime(7, 58),
						end: GetMsFromScheduleTime(8, 38),
					},
					{
						name: 'Three',
						start: GetMsFromScheduleTime(8, 41),
						end: GetMsFromScheduleTime(9, 23),
					},
					{
						name: 'Assembly',
						start: GetMsFromScheduleTime(9, 26),
						end: GetMsFromScheduleTime(10, 26),
					},
					{
						name: 'Five',
						start: GetMsFromScheduleTime(10, 29),
						end: GetMsFromScheduleTime(11, 9),
					},
					{
						name: 'Six',
						start: GetMsFromScheduleTime(11, 12),
						end: GetMsFromScheduleTime(11, 52),
					},
					{
						name: 'Seven',
						start: GetMsFromScheduleTime(11, 55),
						end: GetMsFromScheduleTime(12, 35),
					},
					{
						name: 'Eight',
						start: GetMsFromScheduleTime(12, 38),
						end: GetMsFromScheduleTime(13, 18),
					},
					{
						name: 'Nine',
						start: GetMsFromScheduleTime(13, 21),
						end: GetMsFromScheduleTime(14, 5),
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
