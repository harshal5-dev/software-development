package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L18_Intermediate_DSA;

public class Assignment2 {

  int solve(int[] A) {
    int N = A.length;
    int ans = 0;

    for (int index = 0; index < N; index++) {
      int current = A[index];
      int leftCount = 0;
      int rightCount = 0;

      for (int jIndex = index -1; jIndex >= 0; jIndex--) {
        if (A[jIndex] < current) {
          leftCount++;
        }
      }

      for (int jIndex = index + 1; jIndex < N; jIndex++) {
        if (current < A[jIndex]) {
          rightCount++;
        }
      }

      int count = leftCount * rightCount;
      ans += count;
    }

    return ans;
  }
}
