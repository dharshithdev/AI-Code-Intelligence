from tree_sitter import Language, Parser
import tree_sitter_cpp as tscpp

CPP_LANGUAGE = Language(tscpp.language())
parser = Parser(CPP_LANGUAGE)

FEATURES = [
    "cbo", "wmc", "dit", "rfc", "lcom",
    "totalMethods", "totalFields", "nosi", "loc",
    "returnQty", "loopQty", "comparisonsQty", "tryCatchQty",
    "parenthesizedExpsQty", "stringLiteralsQty", "numbersQty",
    "assignmentsQty", "mathOperationsQty", "variablesQty",
    "maxNestedBlocks", "uniqueWordsQty"
]

def extract_metrics(code):
    tree = parser.parse(code.encode("utf-8"))
    root = tree.root_node

    metrics = {feature: 0 for feature in FEATURES}

    metrics["loc"] = len(code.splitlines())

    words = set()
    max_depth = 0

    def walk(node, depth=0):
        nonlocal max_depth

        max_depth = max(max_depth, depth)

        node_type = node.type

        if node_type == "function_definition":
            metrics["totalMethods"] += 1
            metrics["rfc"] += 1

        elif node_type == "field_declaration":
            metrics["totalFields"] += 1

        elif node_type in ("for_statement", "while_statement", "do_statement"):
            metrics["loopQty"] += 1

        elif node_type in ("if_statement", "switch_statement"):
            metrics["comparisonsQty"] += 1

        elif node_type == "try_statement":
            metrics["tryCatchQty"] += 1

        elif node_type == "return_statement":
            metrics["returnQty"] += 1

        elif node_type == "assignment_expression":
            metrics["assignmentsQty"] += 1

        elif node_type in ("additive_expression", "multiplicative_expression"):
            metrics["mathOperationsQty"] += 1

        elif node_type == "parenthesized_expression":
            metrics["parenthesizedExpsQty"] += 1

        elif node_type == "string_literal":
            metrics["stringLiteralsQty"] += 1

        elif node_type == "number_literal":
            metrics["numbersQty"] += 1

        elif node_type == "identifier":
            metrics["variablesQty"] += 1

            text = code[node.start_byte:node.end_byte]
            words.add(text)

        elif node_type == "compound_statement":
            max_depth = max(max_depth, depth)

        for child in node.children:
            walk(child, depth + 1)

    walk(root)

    metrics["uniqueWordsQty"] = len(words)
    metrics["maxNestedBlocks"] = max_depth

    metrics["wmc"] = (
        metrics["totalMethods"]
        + metrics["comparisonsQty"]
        + metrics["loopQty"]
    )

    metrics["nosi"] = metrics["totalMethods"]

    metrics["dit"] = 1
    metrics["cbo"] = metrics["totalMethods"] + metrics["totalFields"]
    metrics["lcom"] = 0

    return metrics


if __name__ == "__main__":
    with open("test.cpp", "r", encoding="utf-8") as file:
        code = file.read()

    metrics = extract_metrics(code)

    print("Extracted Metrics:")

    for name, value in metrics.items():
        print(f"{name}: {value}")
