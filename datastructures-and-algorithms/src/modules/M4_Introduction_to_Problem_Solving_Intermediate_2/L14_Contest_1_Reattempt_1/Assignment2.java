package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L14_Contest_1_Reattempt_1;


public class Assignment2 {

  int solve(int[] A) {
    int descCount = 1;
    int result = 1;
    int curElement = A[0];

    for (int index = 1; index < A.length; index++) {
      if (curElement > A[index]) {
        descCount++;
        result = Math.max(result, descCount);
      } else {
        descCount = 1;
      }
      curElement = A[index];
    }

    return result;
  }
}
