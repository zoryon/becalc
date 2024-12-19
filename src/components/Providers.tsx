"use client";

import { MathJaxContext } from "better-react-mathjax";

const Providers = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <MathJaxContext>
            {children}
        </MathJaxContext>
    );
}

export default Providers;