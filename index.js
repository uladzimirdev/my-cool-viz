var { jsx: e, jsxs: t, Fragment: n } = window.__METABASE_VIZ_API__.jsxRuntime, r = () => ({
	id: "my-cool-viz",
	getName: () => "my-cool-viz",
	minSize: {
		width: 4,
		height: 3
	},
	defaultSize: {
		width: 6,
		height: 4
	},
	isSensible({ cols: e, rows: t }) {
		return e.length > 0 && t.length > 0;
	},
	checkRenderable(e) {
		if (e.length === 0) throw Error("No data");
	},
	VisualizationComponent: i
}), i = ({ series: n, width: r, height: i }) => {
	let a = n[0]?.data.rows.length ?? 0;
	return /* @__PURE__ */ t("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			width: r,
			height: i,
			fontFamily: "sans-serif"
		},
		children: [/* @__PURE__ */ e("h2", { children: "my-cool-viz" }), /* @__PURE__ */ t("p", { children: [a, " rows"] })]
	});
};
//#endregion
export { r as default };
