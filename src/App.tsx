import React, {FC} from 'react';
import CountOccurrenceFunctional from "./components/count-occurrence-functional";
import CountOccurrenceSortAsAdded from "./components/count-occurrence-sort-as-added";

const App: FC = () => {
    return (
        <>
            <CountOccurrenceFunctional/>
            <hr/>
            <CountOccurrenceSortAsAdded/>
        </>
    )
};

export default App;
