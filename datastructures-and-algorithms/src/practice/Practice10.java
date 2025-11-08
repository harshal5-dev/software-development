package practice;

public class Practice10 {


  static int anyNumberToDecimal(int A, int B) {
    int ans = 0;
    int pow = 1;

    while (A > 0) {
      int digit = A % 10;
      ans += digit * pow;
      A /= 10;
      pow *= B;
    }

    return ans;
  }

  static int decimalToAnyBase(int A, int B) {
    int ans = 0;
    int pow = 1;

    while (A > 0) {
      int digit = A % B;
      ans += digit * pow;
      A /= B;
      pow *= 10;
    }

    return ans;
  }

  static int singleNumber(int[] A) {
    int ans = 0;

    for (int el : A) {
      ans ^= el;
    }

    return ans;
  }

}
