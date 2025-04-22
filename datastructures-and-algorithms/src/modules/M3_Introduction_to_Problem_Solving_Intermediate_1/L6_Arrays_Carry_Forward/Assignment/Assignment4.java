package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L6_Arrays_Carry_Forward.Assignment;

public class Assignment4 {

  static long solve(String A) {
    int count = 0;
    long ans = 0;
    int N = A.length();

    for (int index = 0; index < N; index++) {
      if (A.charAt(index) == 'A') {
        count++;
      }

      if (A.charAt(index) == 'G') {
        ans += count;
      }
    }

    return ans;
  }
}
