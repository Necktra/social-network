import ProfileStatus from "./ProfileStatus";
import { create } from "react-test-renderer";

describe("ProfileStatus component", () => {
    test ("Status from props should be in state", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("it-kamasutra.com");
    });

    test ("After creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com"/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test ("After creation <input> shouldn`t be displayed", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com"/>);
        const root = component.root;
        expect(()=> {
            let input = root.findByType("input");
        }).toThrow();
    });

    test ("After creation <span> should be contains correct status", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com"/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra.com");
    })
});