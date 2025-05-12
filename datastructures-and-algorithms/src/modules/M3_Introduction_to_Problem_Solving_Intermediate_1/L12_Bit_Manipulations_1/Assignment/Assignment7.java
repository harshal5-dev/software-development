package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L12_Bit_Manipulations_1.Assignment;

public class Assignment7 {

  int solve(int A, int B) {
    int pow = 1;
    int ans = 0;

    while (A > 0) {
      int digit = A % 10;
      ans += digit * pow;
      A /= 10;
      pow *= B;
    }

    return ans;
  }
}
