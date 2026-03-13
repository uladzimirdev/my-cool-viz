var { jsx: e, jsxs: t, Fragment: n } = window.__METABASE_VIZ_API__.jsxRuntime, r = ({}) => ({
	id: "thumbs-viz",
	getName: () => "Thumbs",
	minSize: {
		width: 1,
		height: 1
	},
	defaultSize: {
		width: 2,
		height: 2
	},
	isSensible({ cols: e, rows: t }) {
		return e.length === 1 && t.length === 1 && typeof t[0][0] == "number";
	},
	checkRenderable(e, t) {
		if (e.length !== 1) throw Error("Only 1 series is supported");
		let [{ data: { cols: n, rows: r } }] = e;
		if (n.length !== 1) throw Error("Query results should only have 1 column");
		if (r.length !== 1) throw Error("Query results should only have 1 row");
		if (typeof r[0][0] != "number") throw Error("Result is not a number");
		if (typeof t.threshold != "number") throw Error("Threshold setting is not set");
	},
	settings: { threshold: {
		id: "1",
		widget: "number",
		title: "Threshold",
		getDefault() {
			return 0;
		},
		getProps() {
			return {
				options: {
					isInteger: !1,
					isNonNegative: !1
				},
				placeholder: "Set threshold"
			};
		}
	} },
	VisualizationComponent: i
}), i = (t) => {
	let { height: n, series: r, settings: i, width: a } = t, { threshold: o } = i, s = r[0].data.rows[0][0];
	if (typeof s != "number" || typeof o != "number") throw Error("Value and threshold need to be numbers");
	return /* @__PURE__ */ e("div", {
		style: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: a,
			height: n,
			fontSize: 16
		},
		children: s >= o ? "👍" : "👎"
	});
};
//#endregion
export { r as createThumbsViz, r as default };
