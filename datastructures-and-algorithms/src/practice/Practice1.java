package practice;

public class Practice1 {

  static int countFactors(int A) {
    int ans = 0;

    for (int num = 1; num * num <= A; num++) {
      if (A % num == 0) {
        ans += num * num == A ? 1 : 2;
      }
    }

    return ans;
  }

  static int checkPrime(int A) {
    int factorCount = 0;

    for (int num = 1; num * num <= A; num++) {
      if (A % num == 0) {
        factorCount += num * num == A ? 1 : 2;

        if (factorCount > 2) {
          return 0;
        }
      }
    }

    return factorCount == 2 ? 1 : 0;
  }

  static int perfectSquareRoot(int A) {
    for (int num = 1; num * num <= A; num++) {
      if (num * num == A) {
        return num;
      }
    }

    return -1;
  }
}
