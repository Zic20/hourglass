import React from 'react';
2import data from '../constants/sampleMovieData';
3import DataTable from 'react-data-table-component';
4
5const Button = () => <button type="button">Download</button>;
6
7
8const CustomTitle = ({ row }) => (
9	<div>
10		{}
11		<div>{row.title}</div>
12		<div>
13			<div
14				data-tag="allowRowEvents"
15				style={{ color: 'grey', overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}
16			>
17				{}
18				{row.plot}
19			</div>
20		</div>
21	</div>
22);
23
24const columns = [
25	{
26		name: 'Custom Title',
27		selector: row => row.title,
28		sortable: true,
29		maxWidth: '600px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
30		cell: row => <CustomTitle row={row} />,
31	},
32	{
33		name: 'Plot Format',
34		selector: row => row.plot,
35		wrap: true,
36		sortable: true,
37		format: row => `${row.plot.slice(0, 200)}...`,
38	},
39	{
40		name: 'Genres',
41		
42		cell: row => (
43			<div>
44				{row.genres.map((genre, i) => (
45					<div key={i}>{genre}</div>
46				))}
47			</div>
48		),
49	},
50	{
51		name: 'Thumbnail',
52		grow: 0,
53		cell: row => <img height="84px" width="56px" alt={row.name} src={row.posterUrl} />,
54	},
55	{
56		name: 'Poster Link',
57		button: true,
58		cell: row => (
59			<a href={row.posterUrl} target="_blank" rel="noopener noreferrer">
60				Download
61			</a>
62		),
63	},
64	{
65		name: 'Poster Button',
66		button: true,
67		cell: () => <Button>Download Poster</Button>,
68	},
69];
70
71export const CustomCells = () => (
72	<DataTable title="Movie List - Custom Cells" columns={columns} data={data} pagination />
73);
74
75export default {
76	title: 'Columns/Cells/Custom Cells',
77	component: CustomCells,
78};