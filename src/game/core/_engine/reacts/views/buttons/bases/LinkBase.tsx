import { AnchorHTMLAttributes, forwardRef } from "react";


export interface LinkBaseProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    focus?: boolean;
}

const LinkBase = forwardRef<HTMLAnchorElement, LinkBaseProps>(({ focus, children, ...props }: LinkBaseProps, ref) => {

    return (
        <a {...props} >
            {children}
        </a>
    );
});

export default LinkBase;