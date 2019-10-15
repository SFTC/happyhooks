import React from "react";
import { storiesOf } from "@storybook/react";
import { Button, Divider } from "antd";
import useSetState from "../src/useSetState/index.js";

storiesOf("useSetState", module).add("basic usage", () => {
  const [obj, setObj] = useSetState({
    key1: 1,
    key2: 2
  });
  return (
    <>
      <pre>key1: {obj.key1}</pre>
      <pre>key2: {obj.key2}</pre>
      <Divider />
      <Button type="primary" onClick={() => setObj({ key1: obj.key1 + 1 })}>
        change state
      </Button>
    </>
  );
});
