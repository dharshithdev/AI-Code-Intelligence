#include <iostream>

int calculate(int x) {
    int result = 0;

    for (int i = 0; i < x; i++) {
        if (i > 5) {
            result = result + i;
        }
    }

    return result;
}

int main() {
    std::cout << calculate(10);
    return 0;
}