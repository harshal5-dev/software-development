package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L18_Intermediate_DSA;

public class Assignment1 {

  public int solve(String A) {
    int N = A.length();
    int onesCount = 0;
    int ans = 0;

    for (int index = 0; index < N; index++) {
      if (A.charAt(index) == '1') {
        onesCount++;
      }
    }

    if (N == onesCount) {
      return N;
    }

    for (int index = 0; index < N; index++) {
      int leftCount = 0;
      int rightCount = 0;

      for (int jIndex = index - 1; jIndex >= 0; jIndex--) {
        if (A.charAt(jIndex) == '1') {
          leftCount++;
        } else {
          break;
        }
      }

      for (int jIndex = index + 1; jIndex < N; jIndex++) {
        if (A.charAt(jIndex) == '1') {
          rightCount++;
        } else {
          break;
        }
      }

      int len = leftCount + rightCount;

      if (len != onesCount) {
        len += 1;
      }

      ans = Math.max(ans, len);
    }

    return ans;
  }
}
