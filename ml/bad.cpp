#include <iostream>
#include <vector>
using namespace std;

int processData(vector<int>& data) {
    int result = 0;
    int counter = 0;
    int total = 0;

    for (int i = 0; i < data.size(); i++) {
        for (int j = 0; j < data.size(); j++) {
            if (data[i] > 10) {
                if (data[j] < 5) {
                    for (int k = 0; k < 3; k++) {
                        if (data[i] > data[j]) {
                            result = result + data[i] * k;
                            counter++;
                        } else {
                            result = result - data[j] + k;
                        }
                    }
                } else {
                    total = total + data[j];
                }
            } else {
                if (data[i] == data[j]) {
                    result = result + 1;
                }
            }
        }
    }

    if (result > 100) {
        result = result / 2;
    }

    return result + counter + total;
}

int main() {
    vector<int> data = {1, 5, 10, 15, 20, 25, 30};

    int result = processData(data);

    if (result > 50) {
        cout << "High result: " << result << endl;
    } else {
        cout << "Low result: " << result << endl;
    }

    return 0;
}
