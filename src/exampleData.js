export const measurements = [
  {
    id: "291002_1233_44:WAVE1",
    name: "291002_1233_44:WAVE1",
  },
  {
    id: "291002_1233_44:HEAVE",
    name: "291002_1233_44:HEAVE",
  },
];

export const eventLabels = [
  {
    id: "foo",
    name: "Foo",
    color: "#123456",
  },
  {
    id: "bar",
    name: "Bar",
    color: "#654321",
  },
];

export const events = [
  {
    id: "1",
    start: 0,
    duration: 10,
    label: "foo",
    description: "Hello there",
    measurements: [],
  },
  {
    id: "2",
    start: 8,
    duration: 12,
    label: "bar",
    description: "Panic mode engaged!",
    measurements: ["291002_1233_44:WAVE1"],
  },
  {
    id: "3",
    start: 11,
    duration: 12,
    label: "bar",
    description: "Panic mode engaged!",
    measurements: ["291002_1233_44:WAVE1"],
  },
  {
    id: "4",
    start: 25,
    duration: 5,
    label: "bar",
    description: "Panic mode engaged!",
    measurements: ["291002_1233_44:WAVE1"],
  },
];

export const lines = [
  {
    name: "WAVE1",
    unit: "m",
    min: 0,
    max: 20,
    color: "red",
    pointRadius: 3,
  },
  {
    name: "WAVE2",
    unit: "m",
    min: 0,
    max: 60,
    fill: "end",

    color: "purple",
  },
  {
    name: "HEAVE",
    unit: "deg",
    min: 0,
    max: 90,
    color: "blue",
    showLine: false,
    pointRadius: 4,
  },
];

export const linesData = [
  [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
    { x: 120, y: 20 },
  ],
  [
    { x: 0, y: 50 },
    { x: 10, y: 25 },
    { x: 120, y: 59 },
  ],
  [
    {
      x: 0,
      y: 44,
    },
    {
      x: 10,
      y: 50,
    },
    {
      x: 120,
      y: 90,
    },
  ],
];
