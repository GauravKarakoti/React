import { useContext } from "react";
import { MyContext } from "../context";

const Stage2 = () => {
  const context = useContext(MyContext);
  return (
    <>
      <div className="result_wrapper">
        <h3>The loser is:</h3>
        <div>{context.state.result}</div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          className="action_button btn_2"
          onClick={() => context.getNewLooser()}
        >
          GET NEW LOSER
        </div>
        <div
          className="action_button"
          onClick={() => context.resetGame()}
        >
          START OVER
        </div>
      </div>
    </>
  );
}

export default Stage2;