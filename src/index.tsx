import type {
  CreateCustomVisualization,
  CustomVisualizationProps,
} from "@metabase/custom-viz";

type Settings = {};

const createVisualization: CreateCustomVisualization<Settings> = () => {
  return {
    id: "my-cool-viz",
    getName: () => "my-cool-viz",
    minSize: { width: 4, height: 3 },
    defaultSize: { width: 6, height: 4 },
    isSensible({ cols, rows }) {
      return cols.length > 0 && rows.length > 0;
    },
    checkRenderable(series) {
      if (series.length === 0) {
        throw new Error("No data");
      }
    },
    VisualizationComponent,
  };
};

const VisualizationComponent = ({
  series,
  width,
  height,
}: CustomVisualizationProps<Settings>) => {
  const rowCount = series[0]?.data.rows.length ?? 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width,
        height,
        fontFamily: "sans-serif",
      }}
    >
      <h2>my-cool-viz</h2>
      <p>{rowCount} rows</p>
    </div>
  );
};

export default createVisualization;
