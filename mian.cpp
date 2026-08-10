#include <iostream>
#include <ctime>

int main() {
    std::time_t now = std::time(nullptr);
    std::cout << "Xem thoi gian Dep\n";
    std::cout << std::ctime(&now);

    return 0;
}
