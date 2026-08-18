from tree_sitter import Language, Parser
import tree_sitter_cpp as tscpp

CPP_LANGUAGE = Language(tscpp.language())
parser = Parser(CPP_LANGUAGE)

def extract_metrics(code):
    tree = parser.parse(code.encode("utf-8"))
    root = tree.root_node

    metrics = {
        "loc": len(code.splitlines()),
        "totalMethods": 0,
        "loopQty": 0,
        "comparisonsQty": 0,
        "tryCatchQty": 0,
        "returnQty": 0,
        "assignmentsQty": 0,
        "mathOperationsQty": 0
    }

    def walk(node):
        node_type = node.type

        if node_type == "function_definition":
            metrics["totalMethods"] += 1

        elif node_type in (
            "for_statement",
            "while_statement",
            "do_statement"
        ):
            metrics["loopQty"] += 1

        elif node_type in (
            "if_statement",
            "switch_statement"
        ):
            metrics["comparisonsQty"] += 1

        elif node_type == "try_statement":
            metrics["tryCatchQty"] += 1

        elif node_type == "return_statement":
            metrics["returnQty"] += 1

        elif node_type == "assignment_expression":
            metrics["assignmentsQty"] += 1

        elif node_type in (
            "additive_expression",
            "multiplicative_expression"
        ):
            metrics["mathOperationsQty"] += 1

        for child in node.children:
            walk(child)

    walk(root)

    return metrics


if __name__ == "__main__":
    code = """
    int calculate(int x) {
        int result = 0;

        for (int i = 0; i < x; i++) {
            if (i > 5) {
                result = result + i;
            }
        }

        return result;
    }
    """

    metrics = extract_metrics(code)

    print("Extracted Metrics:")

    for name, value in metrics.items():
        print(f"{name}: {value}")