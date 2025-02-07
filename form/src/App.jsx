import './App.css'
import Form from './components/Form'
import { getDate, getTime } from './helpers/helper'

function App() {
  const schema = [
    {
      id: 'name',
      label: "Name",
      type: 'text',
      required: 1,
      value: "",
      style: {},
    },
    {
      id: 'age',
      label: "Age",
      type: 'text',
      required: 1,
      value: "",
      style: {}
    },
    {
      id: 'is_adult',
      label: "Adult",
      type: 'checkbox',
      required: 1,
      value: false,
      style: {}
    },
    {
      id: 'gender',
      label: "",
      labels: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }],
      type: 'radio',
      required: 1,
      value: false,
      style: { display: 'flex', flexDirection: 'column' }
    },
    {
      id: 'dob',
      label: "Date of birth",
      type: 'date',
      required: 1,
      value: getDate,
      style: {}
    },
    {
      id: 'event_time',
      label: "Time of Event",
      type: 'time',
      required: 1,
      value: getTime(),
      style: {}
    },
    {
      id: 'language',
      label: "Language",
      type: 'select',
      required: 1,
      value: '',
      style: {},
      options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    },
  ]
  const handleSubmit = (data) => {
    alert(JSON.stringify(data))
  }
  return (
    <>
      <Form schema={schema} getValues={handleSubmit} />
    </>
  )
}

export default App
